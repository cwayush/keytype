import { Request, Response, NextFunction } from 'express';
export declare const testController: {
    createTest(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getAllTest(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    allTestCount(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=controller.d.ts.map