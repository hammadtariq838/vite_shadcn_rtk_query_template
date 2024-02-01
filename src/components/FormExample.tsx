import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const FormSchema = z.object({
  emailList: z.array(
    z.object({
      email: z
        .string({
          required_error: 'Please select an email to display.',
        })
        .email(),
    })
  ),
});

export default function SelectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast.info(JSON.stringify(data, null, 2));
    toast.info(JSON.stringify(data, null, 2));
    console.log(data);
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'emailList',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-8">
            <FormField
              control={form.control}
              name={`emailList.${index}.email`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-max"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button type="button" onClick={() => append({ email: '' })}>
          Add
        </Button>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
