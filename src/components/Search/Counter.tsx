import { FaMinus, FaPlus } from 'react-icons/fa';

import { FC } from 'react';
import { useAppSelector } from 'src/redux/hook';
import { selectSearch } from 'src/redux/slice/searchSlice';

// icons

interface ICounterProps {
    type: string;
    value: number;
    maxValue: number;
    onIncrease: () => void;
    onDescrease: () => void;
}

const Counter: FC<ICounterProps> = ({ type, value, maxValue, onIncrease, onDescrease }) => {
    const { guests } = useAppSelector(selectSearch);
    console.log(value === maxValue || guests.adults + guests.children === 16);
    return (
        <div className="flex items-center">
            <span
                role="button"
                tabIndex={0}
                className={`${
                    !value && 'cursor-not-allowed opacity-40'
                } btnDecrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                onClick={onDescrease}
            >
                <FaMinus className="h-4 text-gray-300" />
            </span>
            <span className="inline-block text-center w-9">{value}</span>
            {type === 'infants' ? (
                <span
                    role="button"
                    tabIndex={0}
                    className={`${
                        value === maxValue && 'cursor-not-allowed opacity-40'
                    } btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                    onClick={onIncrease}
                >
                    <FaPlus className="h-4 text-gray-300" />
                </span>
            ) : (
                <span
                    role="button"
                    tabIndex={0}
                    className={`${
                        value === maxValue || guests.adults + guests.children === 16 ? 'cursor-not-allowed opacity-40' : ''
                    } btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
                    onClick={onIncrease}
                >
                    <FaPlus className="h-4 text-gray-300" />
                </span>
            )}
        </div>
    );
};

export default Counter;
