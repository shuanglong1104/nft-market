import { provider } from './provider'
import { parseAbiItem,formatUnits } from 'viem'

/**
使用 Viem 编写 ts 脚本查询Ethereum链上最近100个区块链内的 USDC Transfer记录，要求如下：

按格式输出转账记录：
从 0x099bc3af8a85015d1A39d80c42d10c023F5162F0 转账给 0xA4D65Fd5017bB20904603f0a174BBBD04F81757c 99.12345 USDC ,交易ID：0xd973feef63834ed1e92dd57a1590a4ceadf158f731e44aa84ab5060d17336281
给出完整的 ts 脚本
 */

// USDC合约地址（Ethereum主网）
const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

/**
 * 查询最近100个区块内的USDC转账记录
 */
async function print100Block() {
    // 获取当前区块高度
    const curBlockNumber = await provider.getBlockNumber();
    console.log(curBlockNumber,'=======当前区块高度=======');
    const begin = curBlockNumber - BigInt(100);
    console.log("查询区块范围: " + begin + " - " + curBlockNumber +"(含)");

    const filter = await provider.createEventFilter({
        address: usdcAddress,
        // 从合约ABI中解析出Transfer事件
        event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), 
        fromBlock: begin,
        toBlock: curBlockNumber
    });

    const logs = await provider.getFilterLogs({filter});

    logs.forEach((log) => {
        console.log(`从 ${log.args.from} 转账给 ${log.args.to} ${formatUnits(log.args.value!,6)} USDC ,交易ID：${log.transactionHash}`);
    });
}

// 执行查询
print100Block().catch((err) => {
    console.log(err);
});
