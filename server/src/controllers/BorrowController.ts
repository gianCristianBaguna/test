import { Request, Response } from "express";
import FormInputs from "../models/FormInputs";
import { borrowService } from "../services/BorrowService";

class BorrowController {

    public borrow = async (req: Request, res: Response) => {
        const input: FormInputs = req.body;
        try {
            borrowService.borrow(input, (result: string) => {
                return res.json(result)
            })
        } catch (error) {
            throw error;
        }
    }
}

export const borrowController = new BorrowController()