import { Request, Response } from "express";
import User from "../../models/user.model.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { generateToken } from "../../utils/jwt.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import Note from "../../models/note.model.js";
import Subject from "../../models/subject.model.js";
import crypto from "crypto";
import { sendEmail } from "../../utils/email.js";
import { googleClient } from "../../utils/google.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 24 * 60 * 60 * 1000,
};

export const resetPasswordTemplate = (name: string, resetUrl: string) => `
<div style="
max-width:600px;
margin:auto;
padding:32px;
font-family:Arial,sans-serif;
line-height:1.6;
">

<h2>Reset your Revly password</h2>

<p>Hi ${name},</p>

<p>
We received a request to reset your password.
</p>

<p>
Click the button below to choose a new password.
</p>

<p style="margin:32px 0;">
<a
href="${resetUrl}"
style="
background:#111827;
color:#fff;
padding:14px 24px;
text-decoration:none;
border-radius:8px;
display:inline-block;
font-weight:600;
">
Reset Password
</a>
</p>

<p>
This link will expire in <strong>15 minutes</strong>.
</p>

<p>
If you didn't request a password reset, you can safely ignore this email.
</p>

<hr>

<p style="font-size:14px;color:#666;">
Built with ❤️ by Revly
</p>

</div>
`;

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new apiError(409, "User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    const token = generateToken(user._id.toString());
    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json(
        new apiResponse(
          true,

          "User registered successfully",
          {
            user,
          },
        ),
      );
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new apiError(401, "Invalid Credentials");
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    throw new apiError(401, "Invalid Credentials");
  }
  const token = generateToken(user._id.toString());
  res
    .cookie("token", token, cookieOptions)
    .status(201)
    .json(new apiResponse(true, "Login Successfull", { user }));
});

export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json(new apiResponse(true, "Logged Out Successfully", null));
});

export const fetchUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const notes = await Note.countDocuments({
      userId: req.user?._id,
      status: "completed",
    });
    const subjects = await Subject.countDocuments({ userId: req.user?._id });
    const user = {
      ...req.user!.toObject(),
      stats: {
        notes,
        subjects,
      },
    };

    res
      .status(200)
      .json(new apiResponse(true, "User fetched successfully", { user }));
  },
);

export const editUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const user = await User.findById(req!.user!._id);
    if (!user) {
      throw new apiError(404, "User not found");
    }
    if (email) {
      const existingUser = await User.findOne({ email });
      if (
        existingUser &&
        existingUser?._id.toString() !== user?._id.toString()
      ) {
        throw new apiError(409, "Email already exists");
      }
      user.email = email;
    }
    if (name) user.name = name;
    await user?.save();
    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json(
      new apiResponse(true, "User updated successfully", {
        user: updatedUser,
      }),
    );
  },
);

export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const currentPassword = req.body.currentPassword?.trim();
    const newPassword = req.body.newPassword?.trim();
    if (!currentPassword || !newPassword) {
      throw new apiError(400, "Current password and new password are required");
    }
    const user = await User.findById(req?.user?._id);
    if (!user) {
      throw new apiError(404, "User not found");
    }
    const isMatched = await user.comparePassword(currentPassword);
    if (!isMatched) {
      throw new apiError(401, "Invalid Password");
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json(new apiResponse(true, "Password Changed Successfully"));
  },
);

export const deleteAccount = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!._id;

    await Subject.deleteMany({ userId });
    await Note.deleteMany({ userId });

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new apiError(404, "User not found");
    }

    res.clearCookie("token");

    res.status(200).json(new apiResponse(true, "Account deleted successfully"));
  },
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(404, "User not found");
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({
      validateBeforeSave: false,
    });
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    try {
      await sendEmail({
        to: user.email,
        subject: "Reset your Revly password",
        html: resetPasswordTemplate(user.name, resetUrl),
      });
    } catch (error: any) {
      console.log(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save({ validateBeforeSave: false });

      throw new apiError(
        500,
        error.message || "Unable to send reset email. Please try again.",
      );
    }
    res.status(200).json(new apiResponse(true, "Password reset email sent"));
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) {
      throw new apiError(400, "Password is required");
    }
    const hashedToken = crypto
      .createHash("sha256")
      .update(token as string)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) {
      throw new apiError(400, "Reset link is invalid or expired");
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res
      .status(200)
      .json(new apiResponse(true, "Password has been reset successfully"));
  },
);

export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    throw new apiError(400, "Access token is required");
  }

  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!googleResponse.ok) {
    throw new apiError(401, "Invalid Google access token");
  }

  const googleUser = await googleResponse.json();

  const { email, name, picture, email_verified } = googleUser;

  if (!email_verified) {
    throw new apiError(401, "Google email not verified");
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      googleId: googleUser.sub,
    });
  } else {
    if (!user.googleId) {
      user.googleId = googleUser.sub;
    }

    await user.save();
  }

  const token = generateToken(user._id.toString());

  res
    .cookie("token", token, cookieOptions)
    .status(200)
    .json(
      new apiResponse(true, "Google login successful", {
        user,
      }),
    );
});