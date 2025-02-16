// import Tinkle, { TinkleInterface } from "db/schema/tinkle";
// import { nanoid } from "nanoid";
// import { CommandInterface, commandSchema } from "validation/tinkle";
// import { SafeParseReturnType } from "zod";

// export default function post(command:string) {

//   const parsedCommand: SafeParseReturnType<CommandInterface, CommandInterface> =
//     commandSchema.safeParse({
//       command,
//     });

//   if (parsedCommand.success) {
//     const text: string = parsedCommand.data.command;
//     const hash: string = nanoid(5);

//     const tinkle = new Tinkle({
//       text,
//       hash,
//     });

//     tinkle
//       .save()
//       .then((doc: TinkleInterface): void => {
//         console.log(doc);
//         res.json({
//           hash: doc.hash,
//         });
//       })
//       .catch((err: Error): void => {
//         console.error(err);
//         res.status(500).send({ errors: ["Error saving to DB"] });
//       });
//   } else {
//     parsedCommand.error.errors.forEach((error: ZodIssue): void =>
//       console.error(error.message)
//     );
//     res.status(400).send({ errors: parsedCommand.error.errors });
//   }
// }
