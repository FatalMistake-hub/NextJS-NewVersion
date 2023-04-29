import { Box, Button, Input, RadioGroup, Image } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import { useSession } from 'next-auth/react';

const AVATARS = [
    { name: 'Kat', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Kevin', image: 'https://randomuser.me/api/portraits/men/86.jpg' },
    { name: 'Andy', image: 'https://randomuser.me/api/portraits/men/29.jpg' },
    { name: 'Jess', image: 'https://randomuser.me/api/portraits/women/95.jpg' },
];

type Values = {
    email: string;
};

export default function App() {
    const { data: session } = useSession();
    console.log('ssssss',session?.user);
    return (
        <Box p={24}>
            <Formik initialValues={{ email: '' }} onSubmit={console.log}>
                {(props: FormikProps<Values>) => (
                    <form onSubmit={props.handleSubmit}>
                        <Input id="email" />

                        <Button type="submit">Submit</Button>
                    </form>
                )}
            </Formik>
        </Box>
    );
}
