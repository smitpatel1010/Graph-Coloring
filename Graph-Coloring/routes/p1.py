import sys
import pandas as pd
import numpy as np
import io

N = 100000
adj = [[]]
col = []
c = 1
av = []
aaa = {1:'red',2:'blue',3:'green',4:'orange',5:'yellow',6:'black',7:'#ff69b4',8:'#8a2be2',9:'#00ffff',10:'#3h8d5g'}
#st = SortedSet()
graph = {}
cols = {}
def func(n):
    for i in range(n+1):
        col[i]=-1
    col[1]=1
    for i in range(1,n+1):
        for j in adj[i]:
            if(col[j]!=-1):
                av[col[j]]=1
        j=1
        while(j<=n):
            if(av[j]==0):
                break
            j+=1

        col[i]=j
        for k in adj[i]:
            if col[k]!=-1:
                av[col[k]]=0


if __name__ == "__main__":
    #n,m = [int(i) for i in input().split()]
    n = int(sys.argv[1])
    m = int(sys.argv[2])
    links = sys.argv[3]
    links=links.replace('[','')
    links=links.replace(']','')
    links=np.fromstring(links,sep=',').reshape(-1,2)
    #print (links,type(links))
    graph['from'] = []
    graph['to'] = []
    cols['id']=[]
    cols['color']=[]
    for i in range(N):
        lis = []
        adj.append(lis)
        col.append(0)
        av.append(0)
    for i in range(m):
       #x,y = [int(i) for i in input().split()]
       x = int(links[i][0])
       y = int(links[i][1])
       if(x>y):
           t=x
           x=y
           y=t
       adj[x].append(y)
       adj[y].append(x)
       graph['from'].append(x)
       graph['to'].append(y)

    func(n)
    ans = {}

    for i in range(1,n+1):
        ans[str(i)]=aaa[col[i]]
    results = {
        'answer': ans
    }

    ans=str(ans)
    ans=ans.replace("\'","\"")
    #sys.stdout.write(str(results))
    print(ans)
    sys.stdout.flush()
    sys.exit(0)
