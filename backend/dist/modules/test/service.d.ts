export declare const testService: {
    createTest(data: any): Promise<{
        mode: string;
        modeOption: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        wpm: number;
        accuracy: number;
        time: number;
    }>;
    getAllTest(userId: string): Promise<{
        mode: string;
        modeOption: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        wpm: number;
        accuracy: number;
        time: number;
    }[]>;
    allTestCount(): Promise<number>;
};
//# sourceMappingURL=service.d.ts.map