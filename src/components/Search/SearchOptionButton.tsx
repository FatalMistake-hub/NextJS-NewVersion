import React, { ChangeEvent, FC, FocusEvent, PropsWithChildren } from 'react';

import ClearButtonProps from './ClearButton';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';

// components

// icons

interface ISearchOptionButtonProps extends PropsWithChildren<any> {
    relative?: boolean;
    withSearch?: boolean;
    separator?: boolean;
    isSearch?: boolean;
    type?: string;
    title: string;
    placeholder: string;
    active: boolean;
    value: any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur?: (event: FocusEvent<HTMLElement>) => void;
    onClear: () => void;
}

const SearchOptionButton: FC<ISearchOptionButtonProps> = ({
    relative,
    children,
    separator,
    withSearch,
    isSearch,
    type,
    title,
    placeholder,
    active,
    value,
    onChange,
    onFocus,
    onBlur,
    onClear,
}) => {
    return (
        <span
            role="button"
            tabIndex={0}
            className={`${active ? 'shadow-arround hover:bg-white' : ''} ${
                relative && 'relative'
            } flex items-center rounded-2xl bg-white min-h-[64px] `}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <div className={`${withSearch && 'min-w-[120px]'} flex flex-col flex-grow pl-7 pr-3 text-left`}>
                <span className="text-xs font-bold tracking-wider text-gray-500">{title}</span>
                {type === 'inputText' ? (
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        placeholder={placeholder}
                        className="w-full text-sm text-gray-500 placeholder-gray-300 truncate bg-transparent outline-none"
                    />
                ) : (
                    <span className="text-sm text-gray-300 truncate max-w-[105px] lg:max-w-none">{value || placeholder}</span>
                )}
            </div>
            {/* clear icon */}
            <ClearButtonProps onClick={onClear} active={value} isFocus={active} separator={separator} />

            {withSearch && (
                <button
                    type="submit"
                    className={`${
                        isSearch ? 'w-auto saturate-200' : 'w-12'
                    } flex items-center justify-center m-2 ml-0 px-3 h-12  rounded-2xl bg-primary  hover:saturate-200`}
                >
                    <FaSearch className="h-5 text-white" />
                    <span className={`${isSearch ? 'inline-block' : 'hidden'} min-w-[70px] ml-2 font-medium text-white`}>Tìm kiếm</span>
                </button>
            )}
            <div className={`${active ? 'block' : 'hidden'} mt-16`}>{children}</div>
        </span>
    );
};

export default SearchOptionButton;
