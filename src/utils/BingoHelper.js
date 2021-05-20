
class BingoHelper {
  async isBingo(bingoArr) {
		return (await this.checkLinear(bingoArr) 
    || await this.checkVertical(bingoArr) 
    || await this.checkDiagonal(bingoArr) 
    || await this.checkReverseDiagonal(bingoArr)) ? true : false;
	}

	async checkLinear(bingoArr) {
    for (let i = 0; i < 5; i++) {
      let result = true;
    
      for(let k = 0; k < 5; k++) {
        if(!bingoArr[i][k].isSelected) {
          result = false;
        }
      }
    
      if(result) return result;
    }
    
    return false;
	}

	async checkVertical(bingoArr) {
		for (let i = 0; i < 5; i++) {
		   let result = true;
	   
		   for(var k = 0; k < 5; k++) {
          if(!bingoArr[k][i].isSelected) {
            result = false;
          }
		   }

		   if(result) return result;
		 }

    return false;
	}

	async checkDiagonal(bingoArr) {
		for (let i = 0; i < 5; i++) {
      if(!bingoArr[i][i].isSelected) return false;
		}

    return true;
	}

  async checkReverseDiagonal(bingoArr) {
		for (let i = 0; i < 5; i++) {
      for(let k = 0; k < 5; k++) {
        if ((i + k) === (5 - 1)) {
          if(!bingoArr[i][k].isSelected) return false;
        }
		  }
		}

    return true;
	}
}

export default BingoHelper;