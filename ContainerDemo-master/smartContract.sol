pragma solidity ^0.4.24;
contract ContainerTxn {
    function ContainerTxn() public {}
    enum Assets {
        Container
    }
    Assets _shipCleanContainer = Assets.Container;
    Assets _shipContainerWithParts = Assets.Container;
    Assets _shipDirtyContainer = Assets.Container;
    Assets _recycleContainer = Assets.Container;

    function shipCleanContainer(
        string inventoryType,
        string inventoryQty,
        string number,
        string quantity,
        string supplier,
        string smartTrackTxnNo,
        string tmLoadNo,
        string bol,
        string poNo,
        string partNo,
        string assetId, 
        string _bundleHash) public {} 
        // 'assetId' is used to generate graph(experimental feature). It is reuqired, but you can fill with anything 
        // add '_bundleHash', if you prefer to upload a file when calling a method

    function shipContainerWithParts(
        string inventoryType,
        string inventoryQty,
        string number,
        string quantity,
        string supplier,
        string smartTrackTxnNo,
        string tmLoadNo,
        string bol,
        string poNo,
        string partNo,
        string assetId,
        string _bundleHash) public {}

    function shipDirtyContainer(
        string inventoryType,
        string inventoryQty,
        string number,
        string quantity,
        string supplier,
        string tmLoadNo,
        string bol,
        string poNo,
        string partNo,
        string assetId,
        string _bundleHash) public {}

    function recycleContainer(
        string inventoryType,
        string inventoryQty,
        string destinationServiceCenter,
        string assetId,
        string _bundleHash) public {}
}