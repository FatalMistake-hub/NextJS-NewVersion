import { Button as BaseButton, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export type IButton = ButtonProps;

const Button: React.FC<IButton> = ({ ...rest }) => {
    return (
        <div>
            <BaseButton {...rest} />
        </div>
    );
};
export default Button;
