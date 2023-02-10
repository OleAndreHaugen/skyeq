const context = oEvent.oSource.getBindingContext("Master");
SkyeQ.queue = context.getObject();
modeloPageUser.setData({});
oApp.to(oPageUser);