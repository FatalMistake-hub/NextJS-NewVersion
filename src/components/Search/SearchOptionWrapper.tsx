import { FC, PropsWithChildren } from 'react';

interface ISearchOptionProps extends PropsWithChildren<any> {
    className: string;
}

const SearchOptionWrapper: FC<ISearchOptionProps> = ({ className, children }) => {
    return <div className={`${className} absolute px-6 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold`}>{children}</div>;
};

export default SearchOptionWrapper;
