type BtnProps = {
    title: string
    onClickHaandler?: ()=> void
    isDisabled?: boolean
    classes?: string
}
export const Btn = ({title, onClickHaandler,isDisabled,classes}:BtnProps) => {
    return (
        <button className={classes} disabled={isDisabled}  onClick={onClickHaandler}>{title}</button>
    )

}