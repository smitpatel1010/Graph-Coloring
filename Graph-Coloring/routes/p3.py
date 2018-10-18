import sys
from sortedcontainers import SortedSet
import queue
import pandas as pd
import numpy as np

N = 100000
adj = [[]]
col = []
c = 1
graph = {}
cols = {}
aaa = {1:'red',2:'blue',3:'green',4:'orange',5:'yellow',6:'black',7:'#ff69b4',8:'#8a2be2',9:'#00ffff',10:'#3h8d5g'}

if __name__ == "__main__":
    n = int(sys.argv[1])
    m = int(sys.argv[2])
    links = sys.argv[3]
    links=links.replace('[','')
    links=links.replace(']','')
    links=np.fromstring(links,sep=',').reshape(-1,2)
    col.append(0)
    graph['from'] = []
    graph['to'] = []
    cols['ID']=[]
    cols['myvalue']=[]
    for i in range(N):
        lis = []
        adj.append(lis)

    for i in range(n):
        col.append(0)

    for i in range(m):
        x = int(links[i][0])
        y = int(links[i][1])
        adj[x].append(y)
        adj[y].append(x)
        graph['from'].append(x)
        graph['to'].append(y)

    p = []
    p.append((N,N))
    for i in range(1,n+1):
        p.append((len(adj[i]),i))

    p.sort(reverse=True)

    for i in range(1,n+1):
        x,y=p[i]
        st=SortedSet()
        for k in adj[y]:
            st.add(col[k])
        for j in range(1,n+1):
            if((j in st)==False):
                col[y]=j
                break

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
