import MainTree from '../components/MainTree'
import { IRenderTree } from '../types/common'

interface ITreeContainerProps {
    tree: IRenderTree;
    updateChildren: Function;
    currentNodeId: string;
    changeCurrentNodeId: Function;
}

export const TreeContainer = function(props: ITreeContainerProps){

    return (
        <div className="tree-container" onClick={()=>console.log("bubble!")}>
            <MainTree {...props} />
              {/* <ul className="tree-children level1">
                {list.map(item => <li key={item.name} id={item.name} onClick={handleChangePath}>{item.name}</li>)}
              </ul> */}
        </div>
    ) 
}