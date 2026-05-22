import {model} from "mongoose";

import { UserSchema } from "../schemas/UserSchema.js";

export const User = model("User",UserSchema);