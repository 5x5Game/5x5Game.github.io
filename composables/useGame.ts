export function useGame() {
  let table = reactive([
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ]);
  const lastSelected = ref(0)

  const numToXy = (num: number, size: number): number[] => {
    const x = Math.ceil(num / size) - 1
    let y = Math.ceil(num % size) - 1
    if (y === -1) {
      y = size - 1
    }

    return [x, y];
  }

  const check = (selected: number, size: number) => {
    const [x, y] = numToXy(selected, size)
    //test if cell is already full
    if(table[x][y] === 1){
      return false;
    }

    //check if is first use
    if(lastSelected.value === 0){
      return true;
    }
    const last = numToXy(lastSelected.value, size)
    if((Number(last[0]) + 3 === x && Number(last[1]) === y)
      || (Number(last[0])- 3 === x && Number(last[1]) === y)){
      return true;
    }
    if((Number(last[1]) + 3 === y && Number(last[0]) === x)
      || (Number(last[1])- 3 === y && Number(last[0]) === x)){
      return true;
    }
    return (Number(last[1]) - 2 === y && Number(last[0]) - 2 === x)
      || (Number(last[1]) + 2 === y && Number(last[0]) + 2 === x)
      || (Number(last[1]) - 2 === y && Number(last[0]) + 2 === x)
      || (Number(last[1]) + 2 === y && Number(last[0]) - 2 === x);


  }

  const isGameOver = (num: number, size: number) => {
    const [a, b] = numToXy(num, size);
    if(table[a][b] !== 0){
      //Vertical check
      if(a <=2 && b <= 2
        && (typeof table[a+2][b+2] !== 'undefined')
        && (table[a+2][b+2] === 0)){
        return false;
      }
      else if(a >=2 && b >= 2 &&
        (typeof table[a-2][b-2] !== 'undefined')
        && (table[a-2][b-2] === 0)){
        return false;
      }
      else if(a <=2 && b >= 2
        && (typeof table[a+2][b-2] !== 'undefined')
        && (table[a+2][b-2] === 0)){
        return false;
      }
      else if(a >=2 && b <= 2
        && (typeof table[a-2][b+2] !== 'undefined')
        && (table[a-2][b+2] === 0)){
        return false;
      }
      else if(b <=1
        && (typeof table[a][b+3] !== 'undefined')
        && (table[a][b+3] === 0)){
        return false;
      }
      else if(b >= 3
        && (typeof table[a][b-3] !== 'undefined')
        && (table[a][b-3] === 0)){
        return false;
      }
      //Horizontal check
      else if(a <= 1
        && (typeof table[a+3][b] !== 'undefined')
        && (table[a+3][b] === 0)){
        return false;
      }
      else if(a >= 3
        && (typeof table[a-3][b] !== 'undefined')
        && (table[a-3][b] === 0)){
        return false;
      }
    } else {
      return false
    }
    return true;
  }

  const restart = () => {
    for(let z = 0; z < table.length; z++){
      for (let j = 0; j < table.length; j++) {
        table[z][j] = 0;
      }
    }
    lastSelected.value = 0;
  }

  return {
    table,
    lastSelected,
    check,
    numToXy,
    isGameOver,
    restart
  }
}