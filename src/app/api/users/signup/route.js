import { signup } from "@/controllers/authController";

export async function POST(req){  
  return signup(req)
}
