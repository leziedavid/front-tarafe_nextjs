import { redirect } from 'next/navigation';

export default async function Dashboard() {
  
  redirect('/dashboard/overview');

  // if (!session?.user) {
  //   return redirect('/');
  // } else {
  //   redirect('/dashboard/overview');
  // }

}
