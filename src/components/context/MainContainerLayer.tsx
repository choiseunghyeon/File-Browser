import { IRenderTree } from '../../types/common';
import { hasDirectory } from '../../lib/treeUtils';
import PathItem from './items/PathItem';
import { useDefaultTreeDispatch } from '../../lib/useTree';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/rootReducer';
import { shallowCopy } from 'immer/dist/internal';


export default function MainContainerLayer() {      
    const { copyInfo } = useSelector( (state: RootState) => ({
        copyInfo: state.treeState.copyInfo,
    }), shallowCopy)

    return (
      <>

      </>
    )
}