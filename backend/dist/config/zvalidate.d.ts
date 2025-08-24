import * as z from 'zod';
export declare const signInSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const roomSchema: z.ZodObject<{
    name: z.ZodString;
    mode: z.ZodString;
    modeOption: z.ZodString;
}, z.core.$strip>;
export declare const joinRoomSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type RoomInput = z.infer<typeof roomSchema>;
export type JoinRoomInput = z.infer<typeof joinRoomSchema>;
//# sourceMappingURL=zvalidate.d.ts.map