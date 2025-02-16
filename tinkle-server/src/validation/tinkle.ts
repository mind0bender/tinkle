import { z } from "zod";

export interface InputInterface {
  input: string;
}

export const inputSchema: z.ZodObject<
  {
    input: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  InputInterface,
  InputInterface
> = z.object({
  input: z.string({
    invalid_type_error: "input must be a string",
    required_error: "input is required",
  }),
});
