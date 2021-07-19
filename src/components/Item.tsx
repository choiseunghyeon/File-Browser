interface Props {
    name: string;
    selectedName: string;
    changeSelectedName: (event: any) => void;
    handleDblClick: (event: any) => void;
}

export default function Item({name, selectedName, changeSelectedName, handleDblClick}: Props) {

    return (
        <div id={name} onClick={changeSelectedName} onDoubleClick={handleDblClick} style={{
            backgroundColor: selectedName === name ? "grey" : "white"
        }} >
            {name}
        </div>
    )
}
