import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver } from 'react-hook-form';
import * as z from 'zod';

const CredentialSchema = z.object({
    username: z.string().min(1, 'กรุณากรอก Username'),
    password: z.string().min(1, 'กรุณากรอก Password'),
});

export type CredentialSchemaProps = z.infer<typeof CredentialSchema>;

export const CredentialDefaultValue: CredentialSchemaProps = {
    //! Test
    username: 'admin',
    password: 'admin',
};

export const CredentialResolver: Resolver<CredentialSchemaProps> = zodResolver(CredentialSchema);
