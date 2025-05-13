// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Input from "../ui/Input";
// import Button from "../ui/Button";

// export default function AuthForm({
//   schema,
//   onSubmit,
//   fields,
//   submitText = "Submit",
//   isLoading = false,
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {fields.map((field) => (
//         <Input
//           key={field.name}
//           label={field.label}
//           type={field.type}
//           {...register(field.name)}
//           error={errors[field.name]}
//         />
//       ))}
//       <Button type="submit" disabled={isLoading}>
//         {isLoading ? "Processing..." : submitText}
//       </Button>
//     </form>
//   );
// }
