import { useEffect } from 'react';
import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { TransitionProps } from '@material-ui/core/transitions';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import { isDirectory } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';
import { treeValue } from '../tests/constValue';


const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

interface IMainTreeProps {
  tree: IRenderTree;
  updateChildren: Function;
  updateNodeHistory: Function;
  currentNodeId: string;
  changeCurrentNodeId: Function;
}

export default function MainTree({tree, updateChildren, changeCurrentNodeId, currentNodeId, updateNodeHistory}: IMainTreeProps) {
  const classes = useStyles();
  useEffect(() => {
    async function getDirectory () {
      // 초기 store 설정 시 api 요청해서 기본 값으로 가지고 있도록 옮기기
      updateChildren(tree);
      changeCurrentNodeId(tree.id);
      updateNodeHistory(tree.id);
    }
    getDirectory();
  }, []) // only mounted

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={currentNodeId}
    >
      <RecursiveTree node={tree} updateChildren={updateChildren} changeSelectedNodeId={changeCurrentNodeId}/>
    </TreeView>
  );
}

interface IRecursiveTree {
  node: IRenderTree;
  changeSelectedNodeId: Function;
  updateChildren: Function;
}

function RecursiveTree ({node, updateChildren, changeSelectedNodeId}: IRecursiveTree) {
  const {id, name, children} = node;
  
  if (!isDirectory(node)) return null;

  const getDirectoryList = async (e) => {
    // 나중에 분리 mouseover, dblclick? 등
    if (typeof children === "undefined") {
      updateChildren(node);
    }

    changeSelectedNodeId(id);
    // e.preventDefault(); // 하위 트리 확장 막기
  }

  return (
    <StyledTreeItem  data-testid={treeValue} key={id} nodeId={id} label={name} onLabelClick={getDirectoryList}>
      {children ? children.map((node) => <RecursiveTree node={node} updateChildren={updateChildren} changeSelectedNodeId={changeSelectedNodeId} />) : null}
    </StyledTreeItem>
  );

}

const StyledTreeItem = withStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      '& .close': {
        opacity: 0.3,
      },
    },
    group: {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
  }),
)((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}