import * as z from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const roomSchema = z.object({
  name: z.string().min(3, {
    message: "Room name must be at least 3 characters.",
  }),
  mode: z.string().min(1, {
    message: "Please select a mode.",
  }),
  modeOption: z.string().min(1, {
    message: "Please select a mode option.",
  }),
});

export const joinRoomSchema = z.object({
  code: z.string().min(6, {
    message: "Room code must be 6 characters long.",
  }),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type RoomInput = z.infer<typeof roomSchema>;
export type JoinRoomInput = z.infer<typeof joinRoomSchema>;
