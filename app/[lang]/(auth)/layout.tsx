import NavbarSidebar from '@/app/components/NavbarSidebar';


type Props = {
  children: React.ReactNode;
};

export default async function Layout(props: Props) {

  const {
    children
  } = props;

  return (
    <NavbarSidebar>
      {children}
    </NavbarSidebar>
  );
}
