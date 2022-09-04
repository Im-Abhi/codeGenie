#include <iostream>
using namespace std;

void pattern(int n)
{
    int i, j;
    for(i = 1; i <= n; i++)
    {
        for(j = 1; j <= (2 * n); j++)
        {
            if (i > (n - j + 1))
                cout << " ";
            else
                cout << "*";
            if ((i + n) > j)
                cout << " ";
            else
                cout << "*";
        }
        cout << endl ;
    }
      
    for(i = 1; i <= n; i++) {
        for(j = 1; j <= (2 * n); j++)
        {
            if (i < j)
                cout << " ";
            else
                cout << "*";
            if (i <= ((2 * n) - j))
                cout << " ";
            else
                cout << "*";
        }
        cout << endl;
    }
}
int main(){
freopen("input.txt", "r", stdin);
    int n;
    cin>>n;
    pattern(n);
    return 0;
}