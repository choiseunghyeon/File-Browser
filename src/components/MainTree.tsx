import React, { useEffect, useState } from 'react';
import http from '../api/http'
import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { TransitionProps } from '@material-ui/core/transitions';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import { getAbsolutePath } from '../lib/treeUtils';
import { IRenderTree } from '../types/common';



interface IMainTreeProps {
  tree: IRenderTree;
  updateChildren: Function;
  currentNodeId: string;
  changeCurrentNodeId: Function;
}

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function MainTree({tree, updateChildren, changeCurrentNodeId, currentNodeId}: IMainTreeProps) {
  const classes = useStyles();
  useEffect(() => {
    async function getDirectory () {
      const absolutePath = getAbsolutePath(tree);
      const directories = await http.get(`http://localhost:3000/dir?path=${absolutePath.join('/')}`);
      updateChildren(tree.id, directories);
      changeCurrentNodeId(tree.id);
    }
    getDirectory();
  }, []) // mounted

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
  
  const getDirectoryList = async (e) => {
    // 나중에 분리 mouseover, dblclick? 등
    if (typeof children === "undefined") {
      const absolutePath = getAbsolutePath(node);
      const directories = await http.get(`http://localhost:3000/dir?path=${absolutePath.join('/')}`);
      updateChildren(id, directories);
    }

    changeSelectedNodeId(id);
    // e.preventDefault(); // 하위 트리 확장 막기
  }

  return (
    <StyledTreeItem key={id} nodeId={id} label={name} onLabelClick={getDirectoryList}>
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