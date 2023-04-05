import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {}

const CoffeeStore = (props: Props) => {
  const router = useRouter();

  return (
    <div>
        Coffee Store Page {router.query.id}
        <Link href='/'> Back to Home</Link>
    </div>
  )
}

export default CoffeeStore