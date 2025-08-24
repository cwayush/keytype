export declare const roomService: {
    createRoom(data: any): Promise<{
        name: string;
        mode: string;
        modeOption: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getAllRooms(): Promise<{
        name: string;
        mode: string;
        modeOption: string;
        code: string;
        id: string;
    }[]>;
    getRoomByCode(code: string): Promise<{
        name: string;
        mode: string;
        modeOption: string;
        code: string;
        id: string;
    } | null>;
};
//# sourceMappingURL=service.d.ts.map