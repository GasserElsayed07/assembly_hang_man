import "./styles/lang.css"

export default function Language(props){

    const style = {
        backgroundColor: props.background || "red",
        color: props.color || "white",

        fontFamily: "Hanken Grotesk",
        padding: "8px",
        borderRadius: "4px",
        margin: "1px",
        fontWeight: "700",
        fontStyle: "Bold",
        fontSize: "12px",
        leadingTrim: "NONE",
        lineHeight: "100%",
        letterSpacing: "0%",
        textAlign: "center",

    }
    return(
        <p className={props.className} style={style}>{props.name || "Default Language"}</p>
    )
}