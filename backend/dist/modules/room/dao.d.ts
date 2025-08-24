export declare const roomDao: {
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
    getAllRoom(): Promise<{
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
//# sourceMappingURL=dao.d.ts.map