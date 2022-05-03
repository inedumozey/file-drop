import React, {useRef} from 'react';
import clickOpacity from '@mozeyinedu/click-opacity'

export function Button({style, children, opacity, onClick}){

    const btnRef = useRef();
    const { add, remove } = clickOpacity(opacity ? opacity : .8);

    return (
        <div
            onClick={onClick}
            style={
                {
                    padding: '10px',
                    background: '#f5f5f5',
                    display: 'inline-block',
                    cursor: 'default',
                    userSelect: 'none',
                    border: '1px solid #999',
                    ...style,
                }
            }
            ref={btnRef}
            onMouseDown={()=>add(btnRef.current)}
            onMouseUp={()=>remove(btnRef.current)}
            onMouseLeave={()=>remove(btnRef.current)}
        >{children}</div>
    )
}
