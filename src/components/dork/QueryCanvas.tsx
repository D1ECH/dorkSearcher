import {useState} from "react";
import AddBlockButton from "./add_bloque_button";
import QueryBlock from "./QueryBlock";

import type {QueryBlock as QueryBlockType} from "@/data/types";


export default function QueryCanvas(){


const [blocks,setBlocks] = useState<QueryBlockType[]>([]);



function addBlock(operator:string){

    setBlocks([
        ...blocks,
        {
            id:crypto.randomUUID(),
            operator,
            value:""
        }
    ])

}


return (

<div className="
border
rounded-xl
p-6
min-h-[300px]
space-y-4
">


{
blocks.map(block=>(

<QueryBlock
key={block.id}
block={block}
/>

))
}


<AddBlockButton
onAdd={addBlock}
/>


</div>


)


}