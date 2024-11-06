'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Constants for styling
const fontSize = 12;
const padding = 0;
const height = fontSize + padding;

// Utility function to format numbers with suffixes
const formatNumber = (
  num: number
): { formattedNumber: number; suffix: string } => {
  if (num >= 10 ** 9) {
    const formattedNumber = num / 10 ** 9;
    if (
      1000 >= Math.floor(formattedNumber) &&
      Math.floor(formattedNumber) > 100
    ) {
      return { formattedNumber: formattedNumber / 1000, suffix: 'T' };
    }
    return { formattedNumber, suffix: 'B' };
  }
  if (num >= 10 ** 6) {
    const formattedNumber = num / 10 ** 6;
    if (
      1000 >= Math.floor(formattedNumber) &&
      Math.floor(formattedNumber) > 100
    ) {
      return { formattedNumber: formattedNumber / 1000, suffix: 'B' };
    }
    return { formattedNumber, suffix: 'M' };
  }
  if (num >= 10 ** 3) {
    const formattedNumber = num / 10 ** 3;
    if (
      1000 >= Math.floor(formattedNumber) &&
      Math.floor(formattedNumber) > 100
    ) {
      return { formattedNumber: formattedNumber / 1000, suffix: 'M' };
    }
    return { formattedNumber, suffix: 'K' };
  }
  return { formattedNumber: num, suffix: '' };
};

function Counter({
  value,
  withZero = false,
  ...props
}: { value: number; withZero?: boolean } & React.ComponentProps<'div'>) {
  const { formattedNumber, suffix } = formatNumber(value);

  const integerPart = Math.floor(formattedNumber);
  const decimalPart = Math.floor((formattedNumber - integerPart) * 10);

  return (
    <div
      className={cn(
        'flex overflow-hidden items-end leading-none',
        props.className
      )}
    >
      {[...Array(integerPart.toString().length)]
        .map((_, i) => (
          <Digit
            key={i}
            place={10 ** i}
            value={integerPart}
            className={
              !withZero && integerPart == 0 ? 'opacity-0' : 'opacity-100'
            }
          />
        ))
        .reverse()}
      {decimalPart > 0 && (
        <>
          <span
            style={{ height, fontWeight: 'inherit' }}
            className="relative w-[0.4ch] tabular-nums leading-none text-left"
          >
            .
          </span>
          <Digit place={1} value={decimalPart} />
        </>
      )}
      <Suffix suffix={suffix} />
    </div>
  );
}

function Digit({
  place,
  value,
  className,
}: {
  place: number;
  value: number;
  className?: string;
}) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      style={{ height, fontWeight: 'inherit' }}
      className={cn(
        'relative w-[0.9ch] tabular-nums transition-opacity duration-500 ease-in-out',
        className
      )}
    >
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y, fontWeight: 'inherit' }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

const suffixes = ['', 'K', 'M', 'B'];

function Suffix({ suffix }: { suffix: string }) {
  let suffixIndex = suffixes.indexOf(suffix);
  let animatedValue = useSpring(suffixIndex);

  useEffect(() => {
    animatedValue.set(suffixIndex);
  }, [animatedValue, suffixIndex]);

  return (
    <div
      style={{ height, fontWeight: 'inherit' }}
      className={`relative ${
        suffix === '' ? '!w-0' : 'w-[1.1ch]'
      } tabular-nums tracking-normal text-left`}
    >
      {suffixes.map((suffixItem, i) => (
        <SuffixItem key={i} mv={animatedValue} suffix={suffixItem} index={i} />
      ))}
    </div>
  );
}

function SuffixItem({
  mv,
  suffix,
  index,
}: {
  mv: MotionValue;
  suffix: string;
  index: number;
}) {
  let y = useTransform(mv, (latest) => {
    let offset = (suffixes.length + index - latest) % suffixes.length;

    let memo = offset * height;

    if (offset > suffixes.length / 2) {
      memo -= suffixes.length * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y, fontWeight: 'inherit' }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {suffix}
    </motion.span>
  );
}

export default function CounterDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="bg-secondary p-4 rounded-md flex flex-col gap-3 items-center h-96">
      <Counter value={count} withZero className="mx-auto my-3" />
      <div className="flex gap-2">
        <Button onClick={() => setCount(count <= 100 ? 0 : count - 100)}>
          -100
        </Button>
        <Button onClick={() => setCount(count - 1)}>-</Button>
        <Button onClick={() => setCount(count + 1)}>+</Button>
        <Button onClick={() => setCount(count + 100)}>+100</Button>
      </div>
    </div>
  );
}
