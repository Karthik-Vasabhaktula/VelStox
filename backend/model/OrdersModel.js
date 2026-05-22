import {model} from "mongoose";

import { OrdersSchema } from "../schemas/OrdersSchema.js";

export const OrderModel = model("order", OrdersSchema);
