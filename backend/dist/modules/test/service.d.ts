export declare const testService: {
    createTest(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        wpm: number;
        accuracy: number;
        time: number;
        mode: string;
        modeOption: number;
    }>;
    getAllTest(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        wpm: number;
        accuracy: number;
        time: number;
        mode: string;
        modeOption: number;
    }[]>;
    allTestCount(): Promise<number>;
};
//# sourceMappingURL=service.d.ts.map