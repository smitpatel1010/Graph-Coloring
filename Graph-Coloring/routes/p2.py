import sys
from sortedcontainers import SortedSet
import queue
import pandas as pd
import numpy as np

N = 100000
adj = [[]]
col = []
c = 1
ans=N
graph = {}
cols = {}
aaa = {1:'red',2:'blue',3:'green',4:'orange',5:'yellow',6:'black',7:'#ff69b4',8:'#8a2be2',9:'#00ffff',10:'#3h8d5g'}

def check(a,u):
    q = queue.Queue()
    q.put((u,0))
    vis = []
    for i in range(N):
        vis.append(0)
    vis[u]=1
    st = SortedSet()
    while(q.empty()!=True):
        x,y = q.get()
        st.add(a[x])
        for i in adj[x]:
            if(a[x]==a[i]):
                return -1
            if(vis[i]==False):
                q.put((i,y+1))
                vis[i]=1
    return len(st)


def rec(a,n,lev):
    global col
    global ans
    if(lev==n+1):
        temp=check(a,1)
        if(temp!=-1):
            if(ans>temp):
                ans=min(ans,temp)
                col=a[:]
        return
    for i in range(1,n+1):
        a[lev]=i
        rec(a,n,lev+1)

if __name__ == "__main__":
    n = int(sys.argv[1])
    m = int(sys.argv[2])
    links = sys.argv[3]
    links=links.replace('[','')
    links=links.replace(']','')
    links=np.fromstring(links,sep=',').reshape(-1,2)
    a = []
    a.append(0)
    graph['from'] = []
    graph['to'] = []
    cols['ID']=[]
    cols['myvalue']=[]
    for i in range(N):
        lis = []
        adj.append(lis)

    for i in range(n):
        a.append(0)

    for i in range(m):
        #x,y = [int(i) for i in input().split()]
        x = int(links[i][0])
        y = int(links[i][1])
        adj[x].append(y)
        adj[y].append(x)
        graph['from'].append(x)
        graph['to'].append(y)

    rec(a,n,0)

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
