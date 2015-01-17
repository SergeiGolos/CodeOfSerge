<Query Kind="Program" />

void Main()
{
	(new Add()).process(1, 2).Dump();
	(new Sub()).process(1, 2).Dump();
}

public interface Math 
{
	int process(int n1, int n2);
}

public class Add : Math 
{
	public int process(int n1, int n2)
	{ 
		return n1 + n2;
	}
}

public class Sub : Math 
{
	public int process(int n1, int n2)
	{ 
		return n1 - n2;
	}
}

public class Mult : Math 
{
	public int process(int n1, int n2)
	{ 
		return n1 * n2;
	}
}

public class Div : Math 
{
	public int process(int n1, int n2)
	{ 
		return n1 / n2;
	}
}