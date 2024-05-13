import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const clerkId = auth().userId;
  const transformation = transformationTypes[type];

  if (!clerkId) redirect('/sign-in');

  const user = await getUserById(clerkId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className='mt-10'>
        <TransformationForm
          action='Add'
          userId={user.id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
