export const tools = [
	{
		type: 'drag',
		icon: 'drag',
		name: '拖拽'
	},
	{
		type: 'connection',
		icon: 'fork',
		name: '连线'
	},
	{
		type: 'zoom-in',
		icon: 'zoom-in',
		name: '放大'
	},
	{
		type: 'zoom-out',
		icon: 'zoom-out',
		name: '缩小'
	}
];

export const commonNodes = [
	{
		type: 'start', 
		nodeName: '开始', 
		icon: 'StartIcon',
		Icon: 'play-circle'
	},
	{
		type: 'end', 
		nodeName: '结束', 
		icon: 'EndIcon',
		Icon: 'poweroff'
	},
	{
		type: 'common', 
		nodeName: '人工节点', 
		icon: 'CommonIcon',
		Icon: 'user'
	},
	{
		type: 'freedom', 
		nodeName: '自动节点', 
		icon: 'FreedomIcon',
		Icon: 'sync'
	},
	{
		type: 'gateway', 
		nodeName: '网关', 
		icon: 'GatewayIcon',
		Icon: 'fork'
	},
	{
		type: 'event', 
		nodeName: '事件节点', 
		icon: 'EventIcon',
		Icon: 'loading-3-quarters'
	}
];

export const highNodes = [
	{
		type: 'child-flow', 
		nodeName: '子流程', 
		icon: 'ChildFlowIcon',
		Icon: 'api'
	}
];

export const laneNodes = [
	{
		type: 'x-lane', 
		nodeName: '横向泳道', 
		icon: 'XLaneIcon',
		Icon: 'swap'
	},
	{
		type: 'y-lane', 
		nodeName: '纵向泳道', 
		icon: 'YLaneIcon',
		Icon: 'pause'
	}
];
