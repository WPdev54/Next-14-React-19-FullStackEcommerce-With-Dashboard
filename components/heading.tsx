type Props = {
    title:string,
    description:string
}

const Heading: React.FC <Props> = (props: Props) => {
  return (
    <div>
        <h2 className="text-3xl font-bold tracking-tight">{props.title}</h2>
        <p className="text-sm text-muted-foreground">
            {props.description}
        </p>
    </div>
  )
}

export default Heading