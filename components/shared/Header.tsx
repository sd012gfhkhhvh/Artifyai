'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Header = ({
  title,
  subtitle,
  imageId = null,
}: {
  title: string;
  subtitle?: string;
  imageId?: string | null;
}) => {
  const router = useRouter();
  const onUpdateCancelHandler = () => {
    router.push(`/transformations/${imageId}`);
  };
  return (
    <div className='flex justify-between'>
      <div>
        <h2 className='h2-bold text-dark-600'>{title}</h2>
        {subtitle && <p className='p-16-regular mt-4'>{subtitle}</p>}
      </div>
      {imageId && (
        <Button
          type='button'
          className='button-sm capitalize'
          onClick={onUpdateCancelHandler}
        >
          Cancel update
        </Button>
      )}
    </div>
  );
};

export default Header;
