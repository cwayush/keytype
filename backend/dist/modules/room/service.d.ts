export declare const roomService: {
    createRoom(data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mode: string;
        modeOption: string;
        code: string;
    }>;
    getAllRooms(): Promise<{
        name: string;
        id: string;
        mode: string;
        modeOption: string;
        code: string;
    }[]>;
    getRoomByCode(code: string): Promise<{
        name: string;
        id: string;
        mode: string;
        modeOption: string;
        code: string;
    } | null>;
};
//# sourceMappingURL=service.d.ts.map