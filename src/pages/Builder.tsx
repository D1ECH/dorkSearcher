import QueryCanvas from "@/components/dork/QueryCanvas";
import QueryPreview from "@/components/dork/QueryPreview";


export default function Builder(){

    return (

        <div className="
            max-w-5xl
            mx-auto
            space-y-8
        ">

            <div>
                <h1 className="text-4xl font-bold">
                    Dork Creator
                </h1>

                <p className="text-muted-foreground">
                    Build your search queries visually.
                </p>
            </div>

            <QueryCanvas/>
            <QueryPreview/>

        </div>

    )
}