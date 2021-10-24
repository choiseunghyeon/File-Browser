import TabToolbar from '../components/TabToolbar';
import MenuToolbar  from '../components/MenuToolbar';

interface ITopContainerProps {
   list: any;
}

export default function TopContainer({list}: ITopContainerProps) {

   return (
      <div className="top-container">
            <TabToolbar list={list.tabToolbar}/>
            <MenuToolbar list={list.menuToolbar}/>
      </div>
  )
}

