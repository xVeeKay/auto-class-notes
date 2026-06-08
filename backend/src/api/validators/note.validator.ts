import { z } from "zod";

export const editNoteSchema=z.object({
    body:z.object({
        editedContent:z.string().min(1)
    })
})

export const moveNoteSchema=z.object({
    body:z.object({
        subjectId:z.string()
    })
})