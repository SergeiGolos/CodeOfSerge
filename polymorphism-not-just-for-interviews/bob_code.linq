<Query Kind="Program" />

void Main()
{
	var m = new Math();
	m.process("add", 1, 2).Dump();
}

public class Math {

	public int process(string type, int n1, int n2) {
		int result;
		switch (type) {
			case "add":
				result = n1 + n2;
				break;
			case "sub": 
				result = n1 - n2;
				break;
			case "mult": 
				result = n1 * n2;
				break;
			case "div" : 
				result = n1 / n2;
				break;
			default :
			  result = 0;
			  break;
		}
		return result;	
	}
}